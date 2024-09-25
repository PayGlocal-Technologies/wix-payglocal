export function getConfig() {
    return {
        "title": "PayGlocal",
        "paymentMethods": [{
            "hostedPage": {
                "title": "International Credit/Debit Card",
                "billingAddressMandatoryFields": ["FIRST_NAME", "LAST_NAME", "CITY", "ZIPCODE", "STATE"],
                "logos": {
                    "white": {
                        svg: "https://static.payglocal.in/images/processor/payglocal-short.v1.svg",
                        png: "https://static.payglocal.in/icons/general/PayglocalShort.png"

                    },
                    "colored": {
                        svg: "https://static.payglocal.in/images/processor/payglocal-short.v1.svg",
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
