const pharmacyKey = "pharmacy_id";
const pharmacyNameKey = "pharmacy_name";
const roleListKey = "user_role_list";

const cache = {};

function setItem(key, val) {
    try {
        localStorage.setItem(key, val ? val : "");
        cache[key] = val ? val : "";
    } catch (e) {
        localStorage.clear();
        localStorage.setItem(key, val);
        cache[key] = val ? val : "";
    }
}

function getItem(key) {
    if (cache.hasOwnProperty(key)) {
        return cache[key];
    } else {
        let val = localStorage.getItem(key);
        val = val ? val : "";
        cache[key] = val;
        return val;
    }
}

function removeItem(key) {
    try {
        localStorage.removeItem(key);
        delete cache[key];
    } catch (e) {
        setItem(key, "");
        delete cache[key];
    }
}

function setPharmacy(val) {
    setItem(pharmacyKey, val);
}

function getPharmacy() {
    return getItem(pharmacyKey);
}

function removePharmacy() {
    removeItem(pharmacyKey);
}

function getUrlList() {
    return getItem(roleListKey);
}

function setUrlList(val) {
    setItem(roleListKey, val);
}

function removeUrlList() {
    removeItem(roleListKey);
}

function getPharmacyName() {
    return getItem(pharmacyNameKey);
}
function setPharmacyName(val) {
   setItem(pharmacyNameKey, val);
}
function removePharmacyName() {
    removeItem(pharmacyNameKey);
}

module.exports = {
    setPharmacy,
    getPharmacy,
    removePharmacy,
    getUrlList,
    setUrlList,
    removeUrlList,
    getPharmacyName,
    setPharmacyName,
    removePharmacyName,
};
