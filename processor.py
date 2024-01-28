import cv2 as cv
import numpy as np
import base64
import matplotlib.pyplot as plt
from collections import *
from copy import deepcopy
from scipy import stats

BRAILLE_TO_ENGLISH ={
    "000000": " ",
    "100000": "a",
    "110000": "b",
    "100100": "c",
    "100110": "d",
    "100010": "e",
    "110100": "f",
    "110110": "g",
    "110010": "h",
    "010100": "i",
    "010110": "j",
    "101000": "k",
    "111000": "l",
    "101100": "m",
    "101110": "n",
    "101010": "o",
    "111100": "p",
    "111110": "q",
    "111010": "r",
    "011100": "s",
    "011110": "t",
    "101001": "u",
    "111001": "v",
    "010111": "w",
    "101101": "x",
    "101111": "y",
    "101011": "z",
    "001010": ".",
    "001000": ",",
    "011001": "?",
    "011010": "!",
    "011000": ";",
    "010010": ":",
    "001011": "\\",
    "000010": "'",
    "000011": "-"
}

final_string = ""

im = cv.imread("hello.png") # FILE 
gray = cv.cvtColor(im, cv.COLOR_BGR2GRAY)

### HORIZONTAL
thresh_inv = cv.threshold(gray, 0, 255, cv.THRESH_BINARY_INV | cv.THRESH_OTSU)[1]
contours, heirarchy = cv.findContours(thresh_inv, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

# Figuring out the diameter of the big dot by taking the mode
boundingBoxes = [cv.boundingRect(c) for c in contours]
c = Counter([i[2] for i in boundingBoxes])

mode = c.most_common(1)[0][0]
if mode > 1:
	diam = mode
else:
	diam = c.most_common(2)[1][0]

# print(diam)

big_dots = [c for c in contours if cv.boundingRect(c)[2] >= (diam * 0.90)]
small_dots = [c for c in contours if cv.boundingRect(c)[2] < diam]

boundingBoxes = [cv.boundingRect(c) for c in big_dots]

height, width = thresh_inv.shape
num_rows, num_cols = 0, 0
horizontal_lines, vertical_lines = [], []
x_axis_ticks, y_axis_ticks = [], []

# Draw bounding rectangles around the big dots
for c in big_dots:
	x, y, w, h = cv.boundingRect(c)
	cv.rectangle(thresh_inv, (x, y), (x + w, y + h), (0, 0, 0), 1)
	if ((x-3, 0) not in vertical_lines) and ((x-4, 0) not in vertical_lines and ((x-2, 0) not in vertical_lines)):
		vertical_lines.append((x-3, 0))
		cv.line(thresh_inv, (x-3, 0), (x-3, height), (255, 255, 255), 1)
		x_axis_ticks.append(x-3)

	if ((0, y-3) not in horizontal_lines) and ((0, y-4) not in horizontal_lines and ((0, y-2) not in horizontal_lines)):
		horizontal_lines.append((0, y-3))
		cv.line(thresh_inv, (0, y-3), (width, y-3), (255, 255, 255), 1)
		y_axis_ticks.append(y-3)

cv.line(thresh_inv, (width-1, 0), (width-1, height), (255, 255, 255), 1)
cv.line(thresh_inv, (0, height-1), (width, height-1), (255, 255, 255), 1)


x_axis_ticks.append(width-1)
y_axis_ticks.append(height-1)

x_axis_ticks.sort()
y_axis_ticks.sort()

rows, columns = len(horizontal_lines), len(vertical_lines)
    
if len(small_dots) == 0:
	cell_width = diam*2
	cell_height = diam*3

for i in range(len(contours)):
	x, y, w, h, = cv.boundingRect(contours[i])

num_cols = len(x_axis_ticks)
num_rows = len(y_axis_ticks)

grid_array = np.zeros((len(y_axis_ticks) - 1, len(x_axis_ticks) - 1), dtype=int)


for i in range(len(y_axis_ticks)): 
    for j in range(len(x_axis_ticks)): 
        top_left = (x_axis_ticks[j-1], y_axis_ticks[i-1])
        bottom_right = (x_axis_ticks[j], y_axis_ticks[i] if i < len(y_axis_ticks) - 1 else gray.shape[0])

        for contour in big_dots:
            x, y, w, h = cv.boundingRect(contour)
            contour_center = (x + w//2, y + h//2)
            if (top_left[0] < contour_center[0] < bottom_right[0]) and (top_left[1] < contour_center[1] < bottom_right[1]):
                grid_array[i-1][j-1] = 1

matrices_3x2 = []

for row in range(0, grid_array.shape[0], 3):
    for col in range(0, grid_array.shape[1], 2):
        matrix_3x2 = grid_array[row:row+3, col:col+2]
        if matrix_3x2.shape == (3, 2):
            matrices_3x2.append(matrix_3x2)

for matrix in matrices_3x2:
	first_column = ''.join(map(str, matrix[:, 0]))
	second_column = ''.join(map(str, matrix[:, 1]))
	combined_string = first_column + second_column

	if combined_string in BRAILLE_TO_ENGLISH:
		final_string += BRAILLE_TO_ENGLISH[combined_string]
	else:
		final_string += "?"
		
print(final_string.strip()) # FINAL STRING



plt.rcParams["figure.autolayout"] = True

ax = plt.gca()

ax.imshow(thresh_inv, cmap="gray")
ax.set_xticks(x_axis_ticks)
ax.set_yticks(y_axis_ticks)
plt.show()