# JasperReports Server Demo Pack

The JRS Demo Pack has some examples of common requested tasks that customers are interested in learning more about. These examples are just that, examples, and are created to show the concept and should not be thought of as “best practice” for implementing JRS. The goal of each example is to help you understand the feature and how it works at its most basic level. For a real world implementation, Tibco offers a Professional Services team that would be happy to help you setup JRS in your environment using the best practices they have learned over the years.


# Pre-Auth SSO Example

The http://localhost:8080/demo_sso example is used to help you understand how token based security works with JRS. By passing a token to JRS that has been setup for SSO you can see how an organization, user and that users roles and attributes are all synced into the system.

Steps to use this example are as follows….
Copy the XXX folder into you XXX JRS install location
Copy the XXX file into the XXX folder of your JRS install
Update the XXX web page with the location of your JRS install if it is not the default location used when installing the demo
Reboot the JRS server (normally that means reboot Tomcat)

Steps to test this demo are as follows….
If you have a default install of JRS then the following URL should get you to the demo main page http://localhost:8080/demo_sso
From here you can choose different users but for a simple test choose the XXX user
This user is setup to work with the demo data in the default install of JRS and you will see a report displayed that is filtered down based on this users access rights

For a more detailed explanation of the install and demo process, please follow the link below to a video that covers both items.

# iFrame Example

The http://localhost:8080/demo_iframe_example example is used to help you see how JRS can be easily embedded into a web page using the HTTP (iFrame) api.

Steps to use this example are a follows….
Copy the XXX folder into you XXX JRS install location
Update the XXX web page with the location of your JRS install if it is not the default location used when installing the demo
Reboot the JRS server (normally that means reboot Tomcat)

Steps to test this demo are as follows….
If you have a default install of JRS then the following URL should get you to the demo main page http://localhost:8080/demo_iframe_example
Make sure to click on the top login button first to get things started
After the first page is run you can click on any of the other examples

Something very important to note after using this example. The iframe example uses the sessionDecorator=no parameter in the first login page call. This parameter will remove all of the standard JRS menu options for the rest of your time using JRS. If you leave this demo back to your JRS install it will look a little strange. The easiest way to get the system back to normal is by using the following url to reset the system. http://localhost:8080/jasperserver-pro/logout.html
