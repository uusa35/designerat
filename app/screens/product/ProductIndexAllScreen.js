import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../../redux/actions/product';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ProductIndexAllScreen = () => {
  const {products, country} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts({country_id: country.id}));
  }, []);

  useMemo(() => {
    // if (!validate.isEmpty(products)) {
    setCurrentElements(products);
    // }
  }, [products]);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
        searchParams={{country_id: country.id}}
        type="product"
        productGalaryMode={true}
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
