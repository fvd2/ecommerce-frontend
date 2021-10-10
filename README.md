# ecommerce frontend
Front-end for an e-commerce MVP. For practice and demonstration purposes only. 

[live app](https://freekvandam.nl/ecom) - 
[backend repo](https://github.com/fvd2/ecommerce-backend).

## Credits
* UI components: [Tailwind UI](https://tailwindui.com)
* Hero image: [Julian Schiemann/unsplash](https://unsplash.com/@bonvoyagepictures)
* Product data and images: [Tennis-Point](https://www.tennis-point.nl)
* Manifest icon: [Flaticon](https://www.flaticon.com/premium-icon/tennis_2955205?term=tennis%20racket&page=1&position=1&page=1&position=1&related_id=2955205&origin=tag)  

## Functionality
* User management: create account, sign in and change account information
* Products: view products and categories
* Cart: add and remove products, change quantity
* Checkout: enter shipping information, create test payment (via Mollie.com integration) and view order confirmation (status based on provided test payment status, through a webhook called by Mollie)

## Even better if: main ideas for additions and further improvements
* Sign-in: improve email authentication - token-based email confirmation after registering and updating e-mail address
* Sign-in: add social sign-in
* UX: implement feedback through snackbar/notifications and loading spinner
* Account: add order history
* ...

## Notes
The express server is required to properly route requests, due to the use of react-router. Otherwise requests made to e.g. /app/products/[productId] will not render properly, including Mollie's redirect URL after completing the (test) payment process.     
