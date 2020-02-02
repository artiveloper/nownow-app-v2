import React from 'react';
import {Icon} from "@ui-kitten/components";
import {ROOT_HEADER_ICON_SIZE} from "../constants/Layouts";

export const BottomTabBarIcon = ({name, focused, tintColor}) => {
    return (
        <Icon
            name={name}
            width={24}
            height={24}
            fill={focused ? tintColor : 'gray'}
        />
    )
};

export const BackIcon = () => (
    <Icon name='arrow-ios-back-outline' width={ROOT_HEADER_ICON_SIZE} height={ROOT_HEADER_ICON_SIZE}/>
);

export const AddPostIcon = () => (
    <Icon name='plus-outline' width={ROOT_HEADER_ICON_SIZE} height={ROOT_HEADER_ICON_SIZE}/>
);

export const SubmitPostButton = () => (
    <Icon name='done-all-outline' width={ROOT_HEADER_ICON_SIZE} height={ROOT_HEADER_ICON_SIZE}/>
);

export const SelectPhotoButton = () => (
    <Icon name='image-outline'/>
);

export const CloseButton = () => (
    <Icon name='close-circle-outline' width={ROOT_HEADER_ICON_SIZE} height={ROOT_HEADER_ICON_SIZE} fill={'#A0A19E'}/>
);

export const DeleteButton = () => (
    <Icon name='trash-2-outline' width={ROOT_HEADER_ICON_SIZE} height={ROOT_HEADER_ICON_SIZE}/>
);

export const PlusIcon = () => (
    <Icon name='plus-circle-outline' width={ROOT_HEADER_ICON_SIZE} height={ROOT_HEADER_ICON_SIZE}/>
);

export const MinusIcon = () => (
    <Icon name='minus-circle-outline' width={ROOT_HEADER_ICON_SIZE} height={ROOT_HEADER_ICON_SIZE}/>
);
