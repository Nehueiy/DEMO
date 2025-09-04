# # import cv2 as cv
# # import sys
# # import numpy as np
# # #Load two images
# # img1= cv.imread('bacterial rice blight.jpg')
# # img2= cv.imread('tomato.png')
# # if img2 is None:
# #     print("Image not loaded. Check path.")
# # else:
# #     print(img2.shape)

# # print(img1.shape)
# # row,col,ch=img2.shape
# # row= int(row/3)
# # col= int(col/3)
# # print(row,col)
# # img2= cv.resize(img2,(col,row), interpolation=cv.INTER_AREA)
# # print(img2.shape)
# # cv.imshow("bacterial rice blight.jpg")
# # roi=img1[0:row, 0:col]
# # cv.imshow("ROI image", roi)
# import cv2 as cv
# import sys
# import numpy as np

# # Load two images
# img1 = cv.imread('bacterial rice blight.jpg')
# img2 = cv.imread('tomato.png')

# # Check if images are loaded
# if img1 is None:
#     print("❌ img1 not loaded. Check path or filename.")
#     sys.exit()

# if img2 is None:
#     print("❌ img2 not loaded. Check path or filename.")
#     sys.exit()

# # Print shape of original images
# print("Original img2 shape:", img2.shape)
# print("Original img1 shape:", img1.shape)

# # Resize img2
# row, col, ch = img2.shape
# row = int(row / 3)
# col = int(col / 3)
# print("Resized dimensions:", row, col)

# img2 = cv.resize(img2, (col, row), interpolation=cv.INTER_AREA)
# print("Resized img2 shape:", img2.shape)

# # Show resized img2 properly
# cv.imshow("Resized Tomato Image", img2)

# # Region of Interest (ROI) from img1
# roi = img1[0:row, 0:col]
# cv.imshow("ROI image", roi)

# cv.waitKey(0)
# cv.destroyAllWindows()
import cv2 as cv
import sys
import numpy as np
#Load two images
img1= cv.imread('lion.jpg')
img2= cv.imread('V.jpg')
print(img1.shape)
print(img2.shape)

row,col,ch=img2.shape

row= int(row/3)
col= int(col/3)

print(row,col)
img2= cv.resize(img2,(col,row), interpolation=cv.INTER_AREA)
print(img2.shape)

cv.imshow('lion.jpg',img1)
cv.imwrite('V.jpg',img2)

roi=img1 [0:row,0:col]
cv.imshow("ROI IMAGE",roi)

gray=cv.cvtColor(img2,cv.COLOR_BGR2GRAY)
cv.imshow("Gray image",gray)
_,mask=cv.bitwise_not(mask)
cv.imshow("Inverted image", mask_inv)
img1_bg= cv.bitwise_or(roi,roi,mask=mask_inv)
cv.imshow("background",img1_bg)
new=cv.add(img1_bg,img2)
cv.imshow("Added image", new)
waitkey= cv.waitKey(0)