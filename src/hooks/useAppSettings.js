import { useEffect, useState } from 'react';
import { fetchAppSettings } from '../utils/appsettings';

export function useAppSettings() {
	const [appDocData, setAppDocData] = useState({
		// Add default structure to prevent undefined issues
		app_name: '',
		currentBatch: '',
		batches: [],
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const appData = await fetchAppSettings();

				if (appData?.data()) {
					setAppDocData(appData.data());
				}
			} catch (err) {
				console.log(err);
				setError(err.mesage);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { appDocData, loading, error };
}
