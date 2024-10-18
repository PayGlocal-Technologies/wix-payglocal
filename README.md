# Wix-PayGlocal Integration

This repository contains the integration code for embedding PayGlocal as a payment provider within Wix websites. It also includes a guide on file placement and directory structure.

## Installation Guide

Follow these steps to integrate payglocal into your Wix website:

1. **Access Wix Dashboard**
   - Log in to your Wix account and navigate to the website editor.

2. **Navigate to Public & Backend Folders**
   - From the left-hand panel, locate and open the `Public` and `Backend` folders.

3. **Create the Required Folder Structure**
   - Inside the `Service Plugins` directory, create a folder named `Payglocal` under the `payment-provider` section.
   - This repository follows the same folder structure for easy reference.

4. **Create Required Files**
   - Add the files following the same naming convention used in this repository.

5. **Add Configuration Files**
   - In the `Backend` folder, create the following configuration files:
     - `payglocal-wrapper.js`
     - `payglocal-constants.js`

6. **Modify Backend Code**
   - Update the `http-functions.js` file according to the changes specified in this repository.

7. **Install NPM Packages**
   - Navigate to Packages and Apps and install below libraries via npm.
      - `jose`
      - `crypto-js`

8. **Set Merchant-Specific Values**
   - Replace the placeholder values for `ACCOUNT_NAME` and `WEBSITE_NAME` with the merchant’s actual account and website details.
   - Remove any trailing '/' in `ACCOUNT_NAME` and `WEBSITE_NAME`.

9. **Automatic File Generation**
   - After creating the `payglocal` folder, the following files will be auto-generated:
     - `payglocal.js`
     - `payglocal-config.js`

10. **Update Configuration**
   - Make necessary updates to `payglocal-config.js` and `payglocal.js` in line with the repository instructions.

11. **Publish the Website**
    - Once all the changes are made, publish the website to make payglocal live.

12. **Verify Plugin on Payment Page**
    - After publishing, payglocal will appear as a plugin under the "Accept Payments" section.

## Activating PayGlocal for Payment Processing

To activate payglocal as a payment method:

1. **Locate payglocal Plugin**
   - Once the website is published, ensure `PayGlocal` is visible as a payment plugin.

2. **Input Credentials**
   - Enter the provided `MERCHANT_ID` and `API_KEY` in the relevant fields and click `Connect`.

Upon successful connection, payglocal will be ready to process payments.

## Payment Method Verification

1. **Checkout Process**
   - On the checkout page, payglocal should appear as a selectable payment method.

2. **Redirection for Payment**
   - Upon selecting payglocal, the user will be redirected to the payment page to complete the transaction.

3. **Order Creation**
   - After a successful payment, an order entry will be created in the "Orders" tab with all relevant transaction details.
