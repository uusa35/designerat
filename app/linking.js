const configs = {
  screens: {
    Home: {
      path: 'home',
    },
    DesignerShow: {
      path: 'designer/:id',
    },
    CelebrityShow: {
      path: 'celebrity/:id',
    },
    CompanyShow: {
      path: 'company/:id',
    },
    ProductShow: {
      path: 'product/:id',
    },
    Contactus: {
      path: 'contactus',
    },
  },
};
const linking = {
  prefix: 'designerat://',
  configs,
};

export default linking;
