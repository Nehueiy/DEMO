import cv2 as cv
import sys
import numpy as np
#opening first image
# Reading an image in grayscale mode
img = cv.imread('tomato.png')
if img is None:
    sys.exit("Could not read the image1.")
print(img.shape)
print(img.shape[0])
print(img.shape[1])
print(img.size)
img2 = cv.imread('darw.png')
if img2 is None:
    sys.exit("Could not read the image21.")
width=img2.shape[1]
height=img2.shape[0]
img3= cv.resize(img,(width,height), interpolation = cv.INTER_AREA)
print(img3.shape)
cv.imshow("Resized tomato",img3)
img4= img2+img3
cv.imshow("Added image", img4)
img5= cv.addWeighted(img2,0.2,img3,0.8,0)
cv.imshow("Blended image", img5)
cv.waitKey(0)

