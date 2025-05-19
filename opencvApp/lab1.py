import sys
import cv2 as cv

# Use full path
img = cv.imread(r"C:\Users\neha_\OneDrive\Desktop\Image processing lab\feiw.png")

# Exit if image not found
if img is None:
    sys.exit("Could not read the image")

# Display and save
cv.imshow('Display-image', img)
cv.waitKey(0)
cv.destroyAllWindows()

# Save image to same location with new name
path = r"C:\Users\neha_\OneDrive\Desktop\Image processing lab\\"
cv.imwrite(path + "feiw_copy.png", img)