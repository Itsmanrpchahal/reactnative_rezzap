import React, { Component } from 'react'
import {
    View,
    WebView,
    ActivityIndicator
} from 'react-native'
import axios from 'axios'

export default class Paypal extends Component {

    state = {
        accessToken: null,
        approvalUrl: null,
        paymentId: null
    }

    componentDidMount() {
        let currency = '100 INR'
        currency.replace(" INR", "")

        const dataDetail = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": currency,
                    "currency": "INR",
                    "details": {
                        "subtotal": currency,
                        "tax": "10",
                        "shipping": "10",
                        "handling_fee": "10",
                        "shipping_discount": "10",
                        "insurance": "10"
                    }
                }

            }],
            "redirect_urls": {
                "return_url": "https://example.com",
                "cancel_url": "https://example.com"
            }
        }

        axios.post('https://api.sandbox.paypal.com/v1/oauth2/token',
            {
                grant_type: 'client_credentials',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa('AWAN63DSjhqT_63eHgI1PQFAzrI9aSEEJdfkwELN_srCztQMClPHkOuo4zS-syY6Kvs5tr16hdJRQQ5w:EAg9LrY13esczACH7V_WlzCPoib2zRuAEbRx6PWHe9k0FWf59TVaz7br6tqIlJWZrBFQYH0buXYcMlRe')
                }
            }
        )
            .then(response => {
                this.setState({
                    accessToken: response.data.access_token
                })

                axios.post('https://api.sandbox.paypal.com/v1/payments/payment', dataDetail,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer A21AAIVkRxipNG9yl7ghldeow7SZjPfN3Mhf6X4F1ywRME1VPLVPSnRheAmSWwgDLcmrWifpw0VchbAY9kZc-siXpKiGA9gng`
                        }
                    }
                )
                    .then(response => {

                        const { id, links } = response.data
                        const approvalUrl = links.find(data => data.rel == "approval_url")

                        this.setState({
                            paymentId: id,
                            approvalUrl: approvalUrl.href
                        })
                    }).catch(err => {
                        console.log({ ...err })
                    })
            }).catch(err => {
                console.log('Errro ==>   '+err )
            })

    }

    _onNavigationStateChange = (webViewState) => {

        if (webViewState.url.includes('https://example.com/')) {

            this.setState({
                approvalUrl: null
            })

            const { PayerID, paymentId } = webViewState.url

            axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: PayerID },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.accessToken}`
                    }
                }
            )
                .then(response => {
                    console.log(response)

                }).catch(err => {
                    console.log({ ...err })
                })

        }
    }

    render() {

        const { approvalUrl } = this.state
        return (
            <View style={{ flex: 1 }}>
                {
                    approvalUrl ? <WebView
                        style={{ height: 400, width: 300 }}
                        source={{ uri: approvalUrl }}
                        onNavigationStateChange={this._onNavigationStateChange}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        style={{ marginTop: 20 }}
                    /> : <ActivityIndicator />
                }
            </View>
        )
    }
}