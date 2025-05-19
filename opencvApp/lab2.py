import numpy as np
a= np.array([1,3,4,6])
print(a)
b=a[0:2]
print(b)
c=a[:]
print(c)
d=a[2:]
print(d)
e=a[:3]
print(e)
a1= np.array([[1,3,5,7],
             [2,4,6,8]])
#a[row-start:row-end, col-start:col-end]
print(a1)
b1= a1[0:2, 0:3]
print(b1)
c1=a1[1:, 1:3]
print(c1)
d1= a1[:, 1:]
print(d1)

# for comments: control slash