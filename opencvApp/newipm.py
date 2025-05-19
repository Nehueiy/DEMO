# import cv2 as cv
# import numpy as np
# height = 480
# width = 640
# img = np.ones((height, width,3), np.uint8)
# img= img*255
# img[:200,100:400]=(255,0,0)
# img[:, width//2:]=(0,255,0)
# cv.imshow('Mixed image', img)
# cv.waitKey(0)

import cv2 as cv
import numpy as np
height = 480
width = 640
img = np.ones((height, width,3), np.uint8)
img= img*255

img[:, :width//2:]=(0,0,255)
img[:height//2:, width//2:]=(0,255,0)
cv.imshow('Mixed image', img)
cv.waitKey(0)
