import React from "react";
import {Layout, Text} from "@ui-kitten/components";

class TransactionScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: '거래',
            // headerRight:
            //     <View style={{flex: 1, flexDirection: 'row'}}>
            //         <TouchableOpacity
            //             style={{paddingRight: 15}}
            //             onPress={() => navigation.navigate('PostEditor')}>
            //         </TouchableOpacity>
            //     </View>
        }
    };

    render() {
        return (
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text category='h1'>TransactionScreen</Text>
            </Layout>
        )
    }
}

export default TransactionScreen;
