import fitz
doc = fitz.open('public/Mlsa Cui lahore.pdf')
page = doc.load_page(0)
pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
pix.save('public/mlsa_cui.jpg')
