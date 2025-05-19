import cv2 as cv
import numpy as np
height = 480
width = 640
img= np.ones((height, width, 3),np.uint8)
img[:,:]=(255)
cv.imshow('White image', img)
cv.waitKey(0)

img[:,:]=(255,0,0)
cv.imshow('Blue image', img)
cv.waitKey(0)

img[:,:]=(0,255,0)
cv.imshow('Green image', img)
cv.waitKey(0)

img[:,:]=(0,0,255)
cv.imshow('Red image', img)
cv.waitKey(0)

img[:,:]=(100,140,170)
cv.imshow('imagee', img)
cv.waitKey(0)