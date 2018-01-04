
package com.honganwei.common.ws.dreamInfo.com.gpsso;

import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceException;
import javax.xml.ws.WebServiceFeature;


/**
 * <b>��ӭ���ʣ�<a href='http://www.gpsso.com'>www.gpsso.com</a>��лл���֧�֣�</b>
 * 
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.4-b01
 * Generated source version: 2.2
 * 
 */
@WebServiceClient(name = "Dream", targetNamespace = "http://gpsso.com/", wsdlLocation = "http://www.gpsso.com/WebService/Dream/Dream.asmx?wsdl")
public class Dream
    extends Service
{

    private final static URL DREAM_WSDL_LOCATION;
    private final static WebServiceException DREAM_EXCEPTION;
    private final static QName DREAM_QNAME = new QName("http://gpsso.com/", "Dream");

    static {
        URL url = null;
        WebServiceException e = null;
        try {
            url = new URL("http://www.gpsso.com/WebService/Dream/Dream.asmx?wsdl");
        } catch (MalformedURLException ex) {
            e = new WebServiceException(ex);
        }
        DREAM_WSDL_LOCATION = url;
        DREAM_EXCEPTION = e;
    }

    public Dream() {
        super(__getWsdlLocation(), DREAM_QNAME);
    }

    public Dream(WebServiceFeature... features) {
        super(__getWsdlLocation(), DREAM_QNAME, features);
    }

    public Dream(URL wsdlLocation) {
        super(wsdlLocation, DREAM_QNAME);
    }

    public Dream(URL wsdlLocation, WebServiceFeature... features) {
        super(wsdlLocation, DREAM_QNAME, features);
    }

    public Dream(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public Dream(URL wsdlLocation, QName serviceName, WebServiceFeature... features) {
        super(wsdlLocation, serviceName, features);
    }

    /**
     * 
     * @return
     *     returns DreamSoap
     */
    @WebEndpoint(name = "DreamSoap")
    public DreamSoap getDreamSoap() {
        return super.getPort(new QName("http://gpsso.com/", "DreamSoap"), DreamSoap.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns DreamSoap
     */
    @WebEndpoint(name = "DreamSoap")
    public DreamSoap getDreamSoap(WebServiceFeature... features) {
        return super.getPort(new QName("http://gpsso.com/", "DreamSoap"), DreamSoap.class, features);
    }

    private static URL __getWsdlLocation() {
        if (DREAM_EXCEPTION!= null) {
            throw DREAM_EXCEPTION;
        }
        return DREAM_WSDL_LOCATION;
    }

}
