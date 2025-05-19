import cv2 as cv
import sys
import numpy as np
#creating a black image (1-channel)
height = 480
width = 640
img1 = np.zeros((height,width,1), np.uint8)
cv.imshow("Black image-1", img1)
img2= np.ones((height,width, 3), np.uint8)
print(img2)
img2= img2*255
print(img2)
cv.imshow("white image", img2)
cv.waitKey(0)
cv.destroyAllWindows()