# JWT Auth Next.js Django Rest Framework


Example BFF jwt authentication.


## First Run

Backend:
```shell
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
```

Frontend:
```shell
cp .env.development .env.local
yarn install
yarn build
yarn start
```


## Run

Backend:
```shell
python3 manage.py runserver
```

Frontend: 
```shell
yarn build
yarn start
```

---


Source - [Article JWT Authentication with NextJS BFF](https://www.devgould.com/jwt-authentication-with-nextjs-bff-backend-for-frontend/)

