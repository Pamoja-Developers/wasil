const FINANCE_BASE_URL = "/finance";

const FinanceServiceEndpoint = {
  account: {
    add: `${FINANCE_BASE_URL}/add-account`,
    getInfo: `${FINANCE_BASE_URL}/get-account-details`,
    get: `${FINANCE_BASE_URL}/get-accounts`,
    update: `${FINANCE_BASE_URL}/update-account`,
  },
  contributionType: {
    add: `${FINANCE_BASE_URL}/add-contribution-type`,
    getManaging: `${FINANCE_BASE_URL}/get-managing-contribution-types`,
    get: `${FINANCE_BASE_URL}/get-contribution-types`,
    update: `${FINANCE_BASE_URL}/update-contribution-type`,
  },
};

export default FinanceServiceEndpoint;
