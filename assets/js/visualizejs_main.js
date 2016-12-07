visualize({
    auth: {
        name: "jasperadmin",
        password: "jasperadmin",
        organization: "organization_1"
    }
}, function (v) {
    v("#div_chart_1").report({
    resource: "/public/Samples/Reports/02._Sales_Mix_by_Demographic_Report",
    scrollToTop:false,
    scale: "height",
    error: function (err) {
        alert(err.message);
    }
});
});