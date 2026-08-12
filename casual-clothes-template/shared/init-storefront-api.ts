import {
	initStorefrontApi,
	getAppPublicToken,
	getStoreId,
} from '@lightspeed/ecom-headless'

import { ECWID_CONFIG } from './config'

/**
 * Initialize the Storefront API using the Ecwid JS API (window.Ecwid).
 * Uses getAppPublicToken and getStoreId from ecom-headless, which wait for
 * the Storefront JS API to be ready (OnAPILoaded) — no custom retry needed.
 */
export async function useInitStorefrontApi() {
	const publicToken = (await getAppPublicToken(ECWID_CONFIG.clientId)) ?? ''
	const storeId = await getStoreId()

	await initStorefrontApi({
		publicToken,
		storeId,
		...(ECWID_CONFIG.baseURL ? { baseURL: ECWID_CONFIG.baseURL } : {}),
	})

	return {
		publicToken,
		storeId: storeId?.toString(),
	}
}
