import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../../redux/actions/product';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import {filter, unionBy} from 'lodash';
import finalPropsSelectorFactory from 'react-redux/lib/connect/selectorFactory';

const ProductIndexAllScreen = () => {
  const {products, searchProducts, country} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts({country_id: country.id}));
  }, []);

  useMemo(() => {
    const finalProducts = unionBy(products.concat(searchProducts), (p) => p.id);
    setCurrentElements(finalProducts);
  }, [products, searchProducts]);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
        searchParams={{country_id: country.id}}
        type="product"
        productGalleryMode={true}
        pageLimit={55}
        showRefresh={true}
        showFooter={true}
        showSearch={false}
        showSortSearch={true}
        showProductsFilter={true}
        showTitleIcons={true}
        showMore={true}
        columns={3}
      />
    </BgContainer>
  );
};

export default ProductIndexAllScreen;

const styles = StyleSheet.create({});
