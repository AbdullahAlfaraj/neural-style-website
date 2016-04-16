# neural-style-website
### Dependencies:
* [node](https://nodejs.org/en/)
* Install npm 
```shell
sudo npm install npm -g
```
* Install typescript
```shell
npm install -g typescript
```
* [mongoDB](https://docs.mongodb.org/manual/installation/)

### Setup:
1. Clone the repositiry.
```shell
git clone --recursive https://github.com/AbdullahAlfaraj/neural-style-website
```
The recursive option will insure to clone the "neural-style" submodule dependency as well.

2. Install the packages dependencies through npm
```shell
cd neural-style-website
npm install
```

3. Transpile typescript files to javascript, as long as the command run ignore error messages.
```shell
npm run tsc
```

4. run gulp to 
* compile/process scss files to css.
* move/copy all necessary libs/files to the appropriate directories.
```shell
gulp
```
5. lastly, start the server
```shell
bash neural-style-website-up.sh
```
