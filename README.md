pxls-template
=============
A UserScript to make a template overlay over the main canvas, so users can pixel big graphics together more easily

----------

Usage
-----

    https://pxls.space/#url=URL&ox=X&oy=Y&tw=W

 - `URL`: **Required**, a URL to the image which should get overlayed.
 - `X`: *Optional*, an offset on the x-axis to position the image on the canvas, defaults to 0.
 - `Y`: *Optional*, an offset on the y-axis to position the image on the canvas, defaults to 0.
 - `W`: *Optional*, sets a custom width to the image. Useful, if the image is not pixel-sized.

Unused parameters should get omitted, for example: `https://pxls.space/#url=URL` is the valid format if you just want to specify the image URL.
The old parameter name for `URL`, `template` will automatically get changed if the script thinks it'll work.

Contributors
------------
 - `phiresky`: Originally created the script for /r/place
 - `LittleEndu`: Forked the script on 4th of April 2017 to make it work for pxls.space
 - `hammer065`: Me, who is actively developing this UserScript and has rewritten it


*The logo* `pr0gramm-logo.svg` *is owned by the respective creator at pr0gramm.com*