# firebase-forum

[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> Lightweight, performant discussion forum built with Svelte, Firebase, Firestore lite using yarn 2 workspaces. The goal is to build a fully functional discussion forum using Firebase.

## Features

-   Svelte
-   Vite bundler
    -   Code splitting + Lazy loading
-   [firestore-lite](https://firebase.google.com/docs/firestore/solutions/firestore-lite)
    -   Cached data bundles
        -   Working single bundle version - WIP
-   Firebase authentication
    -   Google sign in/out
-   Firebase emulator setup + mocked data for quick local development
-   [Materialize CSS](https://github.com/materializecss/materialize)
-   Forum
    -   Log in/out
    -   Create threads - logged in users
    -   Add comments - logged in users

## Screenshot
![ff-ss-1](https://user-images.githubusercontent.com/26750288/143793897-22a407e3-30c4-4a55-b7b2-f2d34863dd83.png)

## Install & Setup
- [Firestore setup & security overview](https://firebase.google.com/docs/firestore/quickstart)
- `git clone https://github.com/NazimHAli/firebase-forum.git`  
- `yarn install`
- Firebase environment variables
    -  Should have these veriables after completing the first step
    -  Copy [.env.example](/.env.example) to `.env.local`
- Optional - [Setup Firebase emulator suite](https://firebase.google.com/docs/emulator-suite/install_and_configure)
    -  Contains mock data to help get started
    - `yarn buildall`
    - Console 1 - `yarn emu`
    - Console 2 - `yarn dev`

## TODO
-   [ ] Live collection subscriptions
-   [ ] Cache data bundles - WIP
-   [ ] Modify comments
-   [ ] Modify threads
-   [ ] Figure out a good theming architecture/workflow

## Similar projects
- [refire-forum](https://github.com/hoppula/refire-forum)
- [treehole-angular-firebase](https://github.com/xiongemi/treehole-angular-firebase)

[build-img]: https://github.com/NazimHAli/firebase-forum/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/NazimHAli/firebase-forum/actions/workflows/release.yml
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
[issues-img]: https://img.shields.io/github/issues/NazimHAli/firebase-forum
[issues-url]: https://github.com/NazimHAli/firebase-forum/issues
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release