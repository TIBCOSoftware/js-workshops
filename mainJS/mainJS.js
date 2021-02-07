
var initializeVisualize = function(initialize, authentication, configPath) {
//load the config
    var path = configPath ? configPath : '../../../../config/config.json';
    jQuery.getJSON(path)
        .done(function(jrsConfig) {
            options = {
                dataType: "script",
                cache: jrsConfig.cacheVisualizeJS || false,
                url: jrsConfig.visualizeJS
            };

            // load visualize.js
            jQuery.ajax( options ).done( function() {
                // themeHref is a global variable created by loading visualize from a JRS instance
                // initially, it is something like: http://localhost:8080/jasperserver-pro/_themes/19BF127D
                if (themeHref.indexOf("/") === 0) {
                    themeHref = jrsConfig.jrsTheme + themeHref;
                }
                if (typeof themeHref !== 'undefined') {
                    if (themeHref.indexOf("http") == 0) {
                        if (jrsConfig.jrsHostname.indexOf("/") == 0) {
                            // assumes that visualize javascript was loaded via a relative jrsUrl like example above,
                            // not a full URL like http://host:port/jasperserver-pro
                            // let's make it relative!!!!
                            var posOfRelative = themeHref.indexOf(jrsConfig.jrsHostname);
                            if (posOfRelative > 0) {
                                themeHref = themeHref.substring(posOfRelative);
                            }
                        } else if (jrsConfig.jrsHostname.indexOf("https:") == 0 && themeHref.indexOf("http:") == 0 ) {
                            // JRS is reached via a full URL
                            // we have to switch the protocols, since visualize generated the wrong theme URL
                            themeHref = "https:" + themeHref.substring( "http:".length );
                        }
                    }
                } else {
                    // visualize.js script not loaded from a JRS instance
                    // point to theme installed in web app
                    themeHref = "theme";
                }

                visualize({
                    server: jrsConfig.jrsHostname,
                    // assume if a theme is not set in the config,
                    // set it up based on the above process
                    theme: {
                        href: themeHref || jrsConfig.theme
                    },
                    auth: authentication || jrsConfig.jrsAuth
                }, function(v) {
                    initialize(jrsConfig, v);
                }, function(err) {
                    console.log(err);
                    alert(err.message);
                });
            });
        })
        .fail( function (jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "config.json Request Failed: " + err );
        });
}
