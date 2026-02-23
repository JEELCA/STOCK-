"""NSE/BSE data fetcher interface scaffold."""

def get_stock_ohlcv(symbol, start, end): return []
def get_index_ohlcv(index_name, start, end): return []
def get_fii_dii_data(date): return {}
def get_delivery_data(symbol, date): return {}
def get_oi_data(symbol, date): return {}
def get_bulk_deals(date): return []
def get_corporate_actions(symbol): return []
def get_shareholding(symbol, quarter): return {}
def get_vix(): return {}
def get_all_stock_list(): return []
