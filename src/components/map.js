import * as React from 'react';
import { createComponent } from '@lit/react';
import alpacaMap from '@purplebugs/alpaca-map';

export const AlpacaMap = createComponent({
    tagName: 'alpaca-map',
    elementClass: alpacaMap,
    react: React,
});