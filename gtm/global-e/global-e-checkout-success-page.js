// Global-e Checkout Success Page
// Reference Document for variables from https://web.global-e.com/merchant/clientapi#ganaadd
// Author: Rob Edlin
// Date: 28th May 2020
// Version: 0.1

var GTMid = "GTM-XXXXX"; // GTM Container ID goes here
var orderId = data.OrderId;
var lineItems = data.details.products;
var defaultCurrencyCode = "GBP";
window.dataLayer = window.dataLayer || [];
var transactionProducts = [];

if (data.IsSuccess){

    var totalOriginalCartDiscount = 0;
		for(i=0;i<data.details.discounts.length;i++){
          if(data.details.discounts[i].discountTypeId == 1){
            totalOriginalCartDiscount = totalOriginalCartDiscount + data.details.discounts[i].price;
          }
		}	

    // Start of Data Layer
	  // Line Items
    for (var i = 0; i < lineItems.length; i++) {
    var item = lineItems[i];
    transactionProducts.push({
      'id': item.sku,
      'sku': item.sku,
      'name': item.name,
      'price': item.price,
      'quantity': item.quantity,
      'category': item.categories.length ? item.categories[0].name : ''
      });
    }
	 
    // Transaction
    if (transactionProducts.length > 0) {
    window.dataLayer.push({
      'event': 'transactionComplete',
      'ecommerce': {
      'currencyCode': data.details.currency.length ? data.details.currency : defaultCurrencyCode,
      'purchase': {
      'actionField': {
        'id': orderId,                         
        'affiliation': 'Online Store',
        'revenue': parseFloat(data.details.totalProductsPrice - totalOriginalCartDiscount),                     
        'tax': data.details.totalVAT.length ? parseFloat(data.details.totalVAT) : 0,
        'shipping': data.details.discountedShippingPrice.length ? parseFloat(data.details.discountedShippingPrice) : 0,
        'coupon': ''
      },
      'products': transactionProducts
          }
        }
        });
      }
      // End of Data Layer

      //GTM Container Snippet Start
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', GTMid);
      //GTM Container Snippet End
}