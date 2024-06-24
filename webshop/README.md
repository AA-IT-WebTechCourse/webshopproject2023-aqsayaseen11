# Project Name

## Maintainer
- Name: Aqsa Yaseen
- Email: [aqsa.yaseen@abo.fi]

## Introduction
Welcome to my WebShop project! This document provides the necessary instructions to get the project up and running on your local machine.


Requirements implemented:

1. Project folder (MANDATORY) ✔

2. Backend (MANDATORY) ✔

3. Frontend (MANDATORY) ✔

4. Automatic DB population (MANDATORY) ✔

5. Browse (MANDATORY) ✔

7. Create an account (MANDATORY): ✔

8. Login (MANDATORY)  ✔

9. Add item (MANDATORY) ✔

10. Add to cart (MANDATORY) ✔  - (Comments: It is implemented in such a way that on products page if you click add to cart which is not your products, api is hit and button changed to Remove from Cart and it is stored as cart products now if you refresh the page that product will be in the cart as Remove to Cart button is there. There is not a separate route for cart or so... ) 

11. Remove from cart (OPTIONAL) X

12. Pay (OPTIONAL) X
        
13. Routing (OPTIONAL) ✔

14. Edit Account (OPTIONAL) ✔

15. Display inventory (OPTIONAL) ✔

16. Edit item (OPTIONAL) X


## Prerequisites
Before you begin, ensure you have the following installed on your system:
- Python 3
- pip (Python package installer)

## Setup Backend
Follow these steps to set up the backend:


1. Navigate to the project directory:
```
cd webshop
```

2. Create a virtual environment .venv
```
python3 -m venv .venv
```

3. Activate virtual environment
```
source .venv/bin/activate
```

4. Install the required dependencies:
```
pip install -r requirements.txt
```

## Setup Frontend
Follow these steps to set up the frontend:

1. Navigate to the frontend directory:
```
cd frontend
```

2. Install dependencies using the following command
```
npm install
```

3. Generate a frontend build
```
npm run build
```


## Running the Project
To run the Django server locally, follow these steps:

1. Make sure you are in the root `webshop` directory where `manage.py` file exists.

2. Run the database migrations using the following command
```
python manage.py migrate
```

3. Start the server with the following command:
```
python manage.py runserver
```

4. Open your web browser and navigate to the following address to visit the home page:
```
localhost:8080/shop
```

5. You will see a landing page with 0 products. Click on "Populate DB" button to populate the database with dummy data. Refresh the page manually.



## Thank You!


