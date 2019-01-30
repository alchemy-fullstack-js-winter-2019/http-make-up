# HTTP makeup quiz

Create a RESTful express app for colors.

## Colors model

The colors schema should include a name, hex and rgb:

```js
{
  name: 'red',
  hex: '#FF0000',
  rgb: 'rgb(255, 0, 0)
  __v: 0,
  _id: SOME_ID
}
```

## Routes

* `POST /colors` to create a new color
* `GET /colors` returns a list of colors
* `GET /colors/:id` returns a color by id
* `DELETE /colors/:id` to delete a color

**NOTE** you do **NOT** need to implement update.
