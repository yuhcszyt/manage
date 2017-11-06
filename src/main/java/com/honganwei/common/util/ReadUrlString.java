package com.honganwei.common.util;


import java.io.BufferedReader;
import java.io.IOException;

/**
 */
public class ReadUrlString {
	
	public String streamToString(BufferedReader paramBufferedReader)
			throws IOException {
		StringBuilder localStringBuilder = new StringBuilder();
		try {
			for (String str = paramBufferedReader.readLine(); str != null; str = paramBufferedReader
					.readLine())
				localStringBuilder.append(str);
		} catch (Throwable localThrowable) {
			return null;
		}
		return localStringBuilder.toString();
	}

}
