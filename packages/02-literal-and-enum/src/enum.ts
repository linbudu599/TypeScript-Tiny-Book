enum PageUrl {
  Home_Page_Url = 'url1',
  Setting_Page_Url = 'url2',
  Share_Page_Url = 'url3',
}

const home = PageUrl.Home_Page_Url;

enum Items {
  Foo, // 0
  Bar, // 1
  Baz, // 2
}

enum Items1 {
  // 0
  Foo,
  Bar = 599,
  // 600
  Baz,
}

const returnNum = () => 100 + 499;

enum Items2 {
  Foo = returnNum(),
  Bar = 599,
  Baz,
}

enum Items3 {
  Baz,
  Foo = returnNum(),
  Bar = 599,
}

enum Mixed {
  Num = 599,
  Str = 'linbudu',
}

const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"

const enum ConstItems {
  Foo,
  Bar,
  Baz,
}

// const fooValue = 0 /* Foo */; // 0
const fooValue1 = ConstItems.Foo; // 0
