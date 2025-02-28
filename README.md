# Countries

- 📖 This app uses the countries (https://restcountries.com/) API to display a list of them. There is the option to filter by continent and name. Additionaly, each country includes a details page.


## Development

Create a `.env` file for the login authentication. The app uses a mock login email and password which you should include in your `.env` with the values

```shellscript
EMAIL=
PASSWORD=
```
 
Run the dev server:

```shellscript
npm run dev
```

## Approch

I decided to use Remix for this app. I have found it very enjoyable to work with as it is easy for Forms, nested routes, loading states and in general a great development experience. It also comes with Tailwind which I find very easy to work with for styling. I used loaders, pagination and made it responsive. As well added 30 days caching to reduce API calls as the data retrieved does not change very often.

## Trade Offs
The current implementation prioritizes developer experience and quick iteration over production ready features, which might be appropriate for an MVP or prototyping. Some improvements that could be made are adding proper authentiacation and implement retry mechanisms in case of errors when loading.
