export function getConfig() {
    return {
        "title": "PayGlocal",
        "paymentMethods": [{
            "hostedPage": {
                "title": "PayGlocal",
                "billingAddressMandatoryFields": ["FIRST_NAME", "LAST_NAME", "CITY", "ZIPCODE", "STATE"],
                "logos": {
                    "white": {
                        svg: "https://static.payglocal.in/icons/general/PayglocalShort.png",
                        png: "https://static.payglocal.in/icons/general/PayglocalShort.png"

                    },
                    "colored": {
                        svg: "https://static.payglocal.in/icons/general/PayglocalShort.png",
                        png: "https://static.payglocal.in/icons/general/PayglocalShort.png"
                    }
                }
            }
        }],
        "credentialsFields": [{
                "simpleField": {
                    "name": "merchantId",
                    "label": "Merchant ID"
                }
            },
            {
                "simpleField": {
                    "name": "apiKey",
                    "label": "Api Key"
                }
            }
        ]
    }
}