Visualize.js sample app "UrbanRoast" tutorial
=============================================

Getting Started
---------------
 
 > Follow these steps to load the application files
 
 - Install Jaspersoft locally onto your system.
 
 - Download this github repo onto your local web server. Use any tool that you like (for example: [MAMP]) to host.
 
 - Build a new database in POSTGRES called "freshcoffee" with the following tables...
  (coffee, dairy, drink, ingredient, sales)
  
 - You can then load the CSV data from the resources/data folder using the following in your termimal for each file.
 psql -c "COPY tbname FROM '/tmp/the_file.csv' delimiter '|' csv;"
 
 - Import the urban-roast-export.zip file from the resources/jrs-resources folder on this repo into the JasperReport Server by logging in as superuser and going to (admin > server settings > import).
 
 - Run any HTML file from the attached modules.
 
 - Note: You'll want to make sure that all HTML files point to the location you have JRS installed for Visualize.js. 
	This is usually on localhost:8080 - "http://localhost:8080/jasperserver-pro/client/visualize.js"
	
 
 ### Video Tutorials
 
 * Need a jump start? Watch our [Visualize.js tutorial series] and see what's new for version 7. Also you can view our general [API video tutorials] for more information on Visualize.js and embedding inside your application.
 

[Visualize.js API reference guide]: https://community.jaspersoft.com/documentation/tibco-jasperreports-server-visualizejs-guide/v62/api-reference-visualizejs
[JasperReport Server]: https://jaspersoft.com/download
[installation]: https://jaspersoft.com/download
[quick start guide]: https://jaspersoft.com/jaspersoft-quick-start-guide
[API video tutorials]: https://community.jaspersoft.com/wiki/visualizejs-tutorials
[video tutorial series]: https://www.youtube.com/watch?v=hELgK1RG01M&list=PL5NudtWaQ9l4wsnGx0GFyOsvztFBJp1_S
[Visualize.js tutorial series]: https://www.youtube.com/watch?v=hELgK1RG01M&list=PL5NudtWaQ9l4wsnGx0GFyOsvztFBJp1_S
[live demo here]: http://54.244.191.72/urban-roast/cafe.html
[tutorial series here on GitHub.]: http://54.244.191.72/urban-roast/cafe.html
[MAMP]: https://www.mamp.info/en/

[Download JRS]: https://jaspersoft.com/download


License
=================

Copyright © 2018 TIBCO Software Inc. All Rights Reserved. 

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of TIBCO Software Inc.  nor the names of any contributors may  be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT OWNER AND CONTRIBUTORS  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


THIRD PARTY NOTICES

*jQuery 1.11.3

Copyright jQuery Foundation and other contributors, https://jquery.org/

This software consists of voluntary contributions made by many
individuals. For exact contribution history, see the revision history
available at https://github.com/jquery/jquery

The following license applies to all parts of this software except as
documented below:

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

All files located in the node_modules and external directories are
externally maintained libraries used by this software which have their
own licenses; we recommend you read them, as their terms may differ from
the terms above.
