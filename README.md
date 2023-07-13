# A Django/React App for users control
Hi!

In this repo you'll find the development for the proposed app.

The architecture is a monolith composed by: backend (`jobProposal` folder) and the frontend (`job-proposal-frontend` folder)

**Tools:**

- Frontend: React.js (using the [next js](https://nextjs.org/) framework)
- Backend: Django (Python) and a MySQL database for store data :)

### Running the project

Before all, you'll need to install some packages and tools:

Ensure that you have MySQL, Django and React installed in your machine (_you can Google in order to get this installed_)

1. Configure the `setting.py` file to configure your local database:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'job_proposal',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```
2. In the `jobProposal` folder execute:
```bash
python manage.py makemigrations jobProposal
```
This will create needed tables in the database in addition with:
```bash
python manage.py migrate
```
3. You can use the `database/table_insertion.sql` file for populate the created tables in the database
4. When the database is populated, you can run the Django server (port: 8000) with:
```bash
python manage.py runserver
```
5. Now, you can run the frontend (port: 3000) so go to the `job-proposal-frontend` folder and run:
```bash
npm run dev
```

Note: please ensure you've installed dependencies for both Django and React projects.

### Test the project
You can log into the app with an admin (in `localhost:3000/login`):
```text
username: admin
password: admin
```
Or any of the 35 users:
```text
username: user[n]
password: test
```
where n can be: [1,35]

And test the functionality for both roles.

### Thank you

And that's it!
Thank you for your time :D

<small>Developed with ❤️ by: Angel Mateo Gonzalez. 2023</small>
