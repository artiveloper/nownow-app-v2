import React from 'react';
import {Icon} from "@ui-kitten/components";
import {ROOT_HEADER_ICON_SIZE} from "../constants/Layouts";

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
