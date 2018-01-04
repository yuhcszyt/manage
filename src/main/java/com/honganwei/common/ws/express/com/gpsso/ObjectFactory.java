
package com.honganwei.common.ws.express.com.gpsso;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.gpsso package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _ApiSoapHeader_QNAME = new QName("http://gpsso.com/", "ApiSoapHeader");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.gpsso
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link KuaidiQueryResponse }
     * 
     */
    public KuaidiQueryResponse createKuaidiQueryResponse() {
        return new KuaidiQueryResponse();
    }

    /**
     * Create an instance of {@link KuaidiQuery }
     * 
     */
    public KuaidiQuery createKuaidiQuery() {
        return new KuaidiQuery();
    }

    /**
     * Create an instance of {@link ApiSoapHeader }
     * 
     */
    public ApiSoapHeader createApiSoapHeader() {
        return new ApiSoapHeader();
    }

    /**
     * Create an instance of {@link KuaidiQueryResponse.KuaidiQueryResult }
     * 
     */
    public KuaidiQueryResponse.KuaidiQueryResult createKuaidiQueryResponseKuaidiQueryResult() {
        return new KuaidiQueryResponse.KuaidiQueryResult();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ApiSoapHeader }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://gpsso.com/", name = "ApiSoapHeader")
    public JAXBElement<ApiSoapHeader> createApiSoapHeader(ApiSoapHeader value) {
        return new JAXBElement<ApiSoapHeader>(_ApiSoapHeader_QNAME, ApiSoapHeader.class, null, value);
    }

}
