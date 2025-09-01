import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

type ProductState = {
  productsOnBag: Product[];
  setProductsOnBag: React.Dispatch<React.SetStateAction<Product[]>>;
  onAddToBag : (product: Product) => void
};

const ProductContext = createContext<ProductState | undefined>(undefined);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsOnBag, setProductsOnBag] = useState<Product[]>([]);

  const onAddToBag = async (product: Product) => {

    if(productsOnBag.find(item => item.id === product.id)) {
      return;
    }

    setProductsOnBag([...productsOnBag, product])
    await AsyncStorage.setItem('bag', JSON.stringify(productsOnBag));

    Toast.show({
      type: 'success',
      text1: 'Produto adicionado à sacola'
    })
  }

  const getProductsOnBag = async () => {
    const bag = await AsyncStorage.getItem('bag');
    if (bag) {
      setProductsOnBag(JSON.parse(bag));
    }
  }

  useEffect(()=> {
    getProductsOnBag();
  },[])

  const value = {
    productsOnBag,
    setProductsOnBag,
    onAddToBag,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

const useProductsContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductsContext must be used within a ProductProvider");
  }
  return context;
};

export { 
    ProductProvider,
    useProductsContext
}