import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:5173")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Scroll down to reveal the 'Open Source Projects' (Projects) section so project cards become visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll the page down until the 'Open Source Projects' section is visible.
        await page.mouse.wheel(0, 300)
        
        # -> Click the 'Newton's Glitch' project card link in the Selected Projects section to open its demo or repository.
        # 01 Newton's Glitch Physics-based JavaFX game with... link
        elem = page.locator('xpath=/html/body/div/div[4]/section[5]/div/div[2]/div/div/div/a')
        await elem.click(timeout=10000)
        
        # -> Scroll to the 'Selected Projects' section on the homepage to reveal project cards so the Newton's Glitch card can be hovered and its demo link clicked.
        # Switch to tab B941
        page = context.pages[-1]  # switch to most recently active tab
        
        # --> Assertions to verify final state
        
        # --> Verify the project demo opens in a new tab
        # Assert: Expected the Newton's Glitch project link to have target="_blank" so the demo opens in a new tab.
        await expect(page.locator("xpath=/html/body/div/div[4]/section[5]/div/div[2]/div[1]/div/div/a").nth(0)).to_have_attribute("target", "_blank", timeout=15000), "Expected the Newton's Glitch project link to have target=\"_blank\" so the demo opens in a new tab."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    