# Wuzzuf Colne

The source code of `Wuzzuf` ITI final Project

## Table of contents

1. [Installation](#install)
1. [Usage](#use)
1. [Dependencies](#dependencies)
1. [Structure](#structure)
 
## Installation

Make sure to have [Node.js](https://nodejs.org/en/download/)

1. Clone this repo `$ https://github.com/leenaAhmed/wuzzuf-react` or using `ssh`.

2. `$ cd Wuzzuf`.

3. Run `$ npm install` to install dependencies and packages.

<a name="install"></a>

## Usage

Run `$ npm start` to start serving the app, then go to `https://localhost:3000` to view the app.

## Dependencies

This app uses some dependencies:

1. [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) - to implement routing in the app.

1. [Bootstrap](https://getbootstrap.com/) - to add visual designs to the app and helps making css better and easier.

1. [fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) - to add descriptive icons.

1. [Firestore](https://www.npmjs.com/package/firebase) - to add backend .
1. [localizatopn] 

# Our Style Guide

### General requirements

1. Take care about `semantics` rules.
1. Take care about `accessibility` rules.
1. The names of functions, variables, components and css classes should be descriptive.
1. No unnecessary comments.
1. The maximum numbers of arguments is 3, it's preferred to minimize the number of arguments.
1. No global css classes names.
 

## Naming Conventions

- Class names should follow [BEM](https://en.bem.info/methodology/quick-start/) Methodology. You can also read this [Cheat sheet](https://9elements.com/bem-cheat-sheet/).
- Variable, Functions, Methods & components names' should be in `camelCase`.

## Structure

The folder structure of the application. Each module contains `components` has own style.sass

```
.

├── package.json
├── package-lock.json
├── public
|
├── README.md
├── src
│   ├── App.js
│   ├── assets
│   │   ├── fonts
│   │   ├── images
│   │  
│   ├── globals
│   │   ├── contexts
│   │   │   └── theme.context.js
│   │   └── routes.js
│   ├── index.js
│   ├── modules
│   │   ├── Explore
│   │   │   ├── components
│   │   │   │   ├── ExplorCard
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── style.sass
│   │   │   │   ├── ExplorListPage
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── style.sass
│   │   │   │   └── ExplorPage
│   │   │   │       ├── index.js
│   │   │   │       └── style.sass
│   │   │  
│   │   ├── settings
│   │   │   ├── components
│   │   │   │   ├── form
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── style.sass
│   │   │   │   ├── icon
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── style.sass
│   │   │   │   └── page
│   │   │   │       ├── index.js
│   │   │           └── style.sass
│   ├── shared
│   │   ├── footer
│   │   │   ├── index.js
│   │   │   └── style.sass
│   │   ├── Navbar
│   │   │   ├── index.js
│   │   │   └── style.sass
│   └── styles.sass
└── package-lock.json
```
