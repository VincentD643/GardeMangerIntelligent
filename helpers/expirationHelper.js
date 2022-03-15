
const milkProducts = ["Produits laitiers, Laits, Laits de vache",
    "Produits laitiers", 
    "Laits", 
    "Laits de vache", 
    "dairies", 
    "milks", 
    "cow-milks", 
    "dairy", 
    "milk", 
    "yogurts", 
    "Yaourt", 
    "Produits laitiers fermentés", 
    "Yaourts nature, Yaourts au lait de vache"]

const plantBasedProducts = ["Aliments et boissons à base de végétaux", 
    "Aliments et boissons à base de végétaux, Aliments d'origine végétale, Céréales et pommes de terre, Pains", 
    "Plant-based foods and beverages",
    "Plant-based foods,Cereals and potatoes",
    "Cereals and their products",
    "Pastas",
    "Dry pastas",
    "Durum wheat pasta",
    "Spaghetti",
    "Durum wheat spaghetti",
    "en:plant-based-foods-and-beverages", 
    "en:plant-based-foods", 
    "en:cereals-and-potatoes", 
    "en:breads",
    "en:cereals-and-their-products",
    "en:pastas",
    "en:dry-pastas",
    "en:durum-wheat-pasta",
    "en:spaghetti",
    "en:durum-wheat-spaghetti"
]

const cannedProducts = ["Canned foods, Meals, Soups, Canned meals, Canned soups",
    "Cannes",
    "Canned foods", 
    "Canned meals",
     "Canned soups", 
    "en:canned-foods",
    "en:meals",
    "en:soups",
    "en:canned-meals",
    "en:canned-soups"]

const chipsProducts = ["Chips barbecue, Chips de pommes de terre, en:potato-crisps-in-sunflower-oil, Chips de pommes de terre aromatisées, Chips barbecue",
    "snacks",
    "Chips barbecue",
    "Chips de pommes de terre", 
    "en:potato-crisps-in-sunflower-oil", 
    "Chips de pommes de terre aromatisées", 
    "Chips barbecue",
    "en:plant-based-foods-and-beverages",
    "en:plant-based-foods",
    "en:snacks",
    "en:cereals-and-potatoes",
    "en:salty-snacks",
    "en:appetizers",
    "en:chips-and-fries",
    "en:crisps",
    "en:potato-crisps",
    "en:flavoured-potato-crisps",
    "en:barbecue-crisps",
    "en:potato-crisps-in-sunflower-oil"]

const breakfastProducts = [
    "Produits à tartiner,Petit-déjeuners,Produits à tartiner sucrés,Pâtes à tartiner,Pâtes à tartiner aux noisettes,Pâtes à tartiner au chocolat,Pâtes à tartiner aux noisettes et au cacao",
    "Produits à tartiner",
    "Petit-déjeuners",
    "Produits à tartiner sucrés",
    "Pâtes à tartiner",
    "Pâtes à tartiner aux noisettes",
    "Pâtes à tartiner au chocolat",
    "Pâtes à tartiner aux noisettes et au cacao",
    "en:spreads",
    "en:breakfasts",
    "en:sweet-spreads",
    "fr:pates-a-tartiner",
    "en:hazelnut-spreads",
    "en:chocolate-spreads",
    "en:cocoa-and-hazelnuts-spreads"
]

const condimentsProducts = [
    "Condiments",
    "Tomato sauces", 
    "Ketchup", 
    "Tomato Ketchup",
    "Condiments",
    "Sauces", 
    "Moutardes",
    "en:sauces",
    "en:mayonnaises",
    "en:egg-free-mayonnaises"
]

const frozenProducts = [
    "Frozen foods",
    "Frozen pizzas and pies",
    "Frozen ready-made meals",
    "Frozen pizzas",
    "Frozen meals",
    "en:frozen-foods",
    "en:meals",
    "en:pizzas-pies-and-quiches",
    "en:pizzas",
    "en:cheese-pizzas",
    "en:frozen-pizzas-and-pies",
    "en:frozen-ready-made-meals",
    "en:four-cheese-pizza",
    "en:frozen-pizzas"
]


const expirationByProductType = (productType) => {
    let date = new Date()
    console.log("productType", productType)
    if (milkProducts.includes(productType)){
        return new Date(date.setDate(date.getDate() + 14));
    } else if (plantBasedProducts.includes(productType)) {
        return new Date(date.setMonth(date.getMonth() + 12));
    } else if (cannedProducts.includes(productType)) {
        return new Date(date.setMonth(date.getMonth() + 60));
    } else if (chipsProducts.includes(productType)) {
        return new Date(date.setMonth(date.getMonth() + 2));
    } else if (breakfastProducts.includes(productType)) {
        return new Date(date.setMonth(date.getMonth() + 3));
    } else if (condimentsProducts.includes(productType)){
        return new Date(date.setMonth(date.getMonth() + 12));
    } else if (frozenProducts.includes(productType)){
        return new Date(date.setMonth(date.getMonth() + 24));
    }
    return null
}

export { expirationByProductType } 
