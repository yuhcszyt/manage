package com.honganwei.common.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PublicinformationUtil {
	public static String GetProperties(String key) {
		try {
			Properties procite = new Properties();
			InputStream fis = PublicinformationUtil.class.getResourceAsStream("../../../../publicinformation.properties");
			procite.load(fis);
			if (procite.containsKey(key))
				return procite.getProperty(key);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
}
