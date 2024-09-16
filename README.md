# wix-payglocal
- **This repository holds integration code for wix to be embedded in the merchant website.**
- **This will also guide where to place the respective files in hierarchy.**

## Installation
 1. Goto wix dashboard and edit website.
 2. Move to Public & Backend folder from the left index panel.
 3. Create a folder as `Payglocal` under payment-provider in Service Plugins.
        
        Same folder structure is followed in repository as well.
 4.  Create respective files with the same name convention as in repository.
 5. Create configuration files `payglocal-wrapper.js, payglocal-constants.js` under backend folder.
 6. Modify `http-functions.js` file as per the repository.
 7. Replace constant values for `ACCOUNT_NAME` and `WEBSITE_NAME` as per merchant's account and website values.
 8. Once `Payglocal` folder is created, `payglocal-config.js` and  `payglocal.js` files will be generated automatically.
 9. Update code in `payglocal-config.js` and `payglocal.js` as per the repository.
 10. When all changes are in place, publish the website.
 11. Once website is published `Payglocal` will be visible as a plugin on `Accept Payments Page`.


 ## Activate For Payment Processing

 1. When the website is published and `PayGlocal` is visible as a payment plugin.
 2. Enter the credentials `MerchantId` and `Api_Key` in the respective fields, click `Connect`.
 
 Once the connection is successful, we are ready to process payments via `PayGlocal`.

 ## Verification

 - On checkout page `PayGlocal` will be visible as a payment method.
 - Selecting this payment mode will redirect user to the page where payment can be made.
 - When the payment is successful, an entry is created in `Orders Tab` with the details.
