Visualize.js sample app "UrbanRoast" tutorial
=============================================

* You can view the [live hosted demo here.]

* Follow along with our v7 embedding [video tutorial series here.]


Getting started
---------------
 
 > Follow these steps to load this demo locally onto your system
 
 - First install Jaspersoft v7. If needed, you can install the [60 day trial here.]
 
 - Download this github repo onto your local web server. Use any tool that you like (for example: [MAMP]) to host.
 
 - Build a new database in POSTGRES called "freshcoffee" (using pgAdmin you can right click Databases > create > database)
  
 - Now right click your "freshcoffee" database and select restore. Under Filename you can select your database file named "freshcoffee" under the resources/data folder in this repo. 
  
 - Your data should now be set! If you need them, you can also find the CSV data files under the resources/data folder and scripts to build the tables and add with the following in the terminal...
 - psql -c "COPY tbname FROM '/tmp/the_file.csv' delimiter '|' csv;"
 
 - Now import the jrs-urban-export.zip file from the resources/jrs-resources folder on this repo into the JasperReport Server by logging in as superuser and going to (admin > server settings > import).
 
 - You can also double check your database connection by going to the Jaspersoft Server, opening view > repository and navigating to public > samples > UrbanRoast > Data Sources. Now you can right click the "freshcoffee" data source and select edit to ensure that your Postgres username and password (default: postgres/postgres) is set. If your Postgres data port is different than the default you can change it here as well.
 
 - You can now run any of the main module pages, for example module3 and cafe.html on your server. From there you can use the top right nav in the page to run any of the three finished modules.
 
 - Keep in mind that module1 is broken up into three parts as we build, with the module 1-3 and locations.html as the finished result.
 
 - Note: You'll want to make sure that all HTML files point to the location you have JRS installed for Visualize.js. 
	This is usually on localhost:8080 - "http://localhost:8080/jasperserver-pro/client/visualize.js"
	
 
 ### Video Tutorials
 
 * Need a jump start? Watch our [Visualize.js tutorial series] and see what's new for version 7. Also you can view our general [API video tutorials] for more information on Visualize.js and embedding inside your application.
 

[Visualize.js API reference guide]: https://community.jaspersoft.com/documentation/tibco-jasperreports-server-visualizejs-guide/v62/api-reference-visualizejs
[JasperReport Server]: https://jaspersoft.com/download
[installation]: https://jaspersoft.com/download
[quick start guide]: https://jaspersoft.com/jaspersoft-quick-start-guide
[API video tutorials]: https://community.jaspersoft.com/wiki/visualizejs-tutorials
[video tutorial series here.]: https://www.youtube.com/watch?v=hELgK1RG01M&list=PL5NudtWaQ9l4wsnGx0GFyOsvztFBJp1_S
[live demo here]: http://54.244.191.72/urban-roast/cafe.html
[tutorial series here on GitHub.]: http://54.244.191.72/urban-roast/cafe.html
[MAMP]: https://www.mamp.info/en/
[live hosted demo here.]: http://54.244.191.72/urban-roast/cafe.html
[60 day trial here.]: https://www.jaspersoft.com/download

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
