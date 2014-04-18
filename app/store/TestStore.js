Ext.define('WebInspect.store.TestStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'WebInspect.model.TestModel'
    ],

    config: {
        autoLoad: true,
        model: 'WebInspect.model.TestModel',
        storeId: 'TestStore',
        defaultRootProperty: 'items',
        root: {
            id: '0',
            items: [
                {
                    text: 'Today',
                    items: [
                        {
                            text: 'Mow Grass',
//                            leaf: true,
                            items: [
                                {
                                    text: 'Mow Grass 11',
                                    leaf: true
                                }
                            ]
                        },
                        {
                            text: 'Buy Groceries',
                            leaf: true
                        },
                        {
                            text: 'Watch Game',
                            leaf: true
                        }
                    ]
                },
                {
                    text: 'Tomorrow',
                    items: [
                        {
                            text: 'Frisbee',
                            leaf: true
                        },
                        {
                            text: 'Cookout',
                            leaf: true
                        }
                    ]
                },
                {
                    text: 'This week',
                    items: [
                        {
                            text: 'Call Mom',
                            leaf: true
                        },
                        {
                            text: 'Study',
                            leaf: true
                        },
                        {
                            text: 'Take Test',
                            leaf: true
                        }
                    ]
                },
                {
                    text: 'Later',
                    items: [
                        {
                            text: 'Buy Clothes',
                            leaf: true
                        },
                        {
                            text: 'Buy Clothes',
                            leaf: true
                        },
                        {
                            text: 'Buy Clothes',
                            leaf: true
                        },
                        {
                            text: 'Buy Clothes',
                            leaf: true
                        },
                        {
                            text: 'Buy Clothes',
                            leaf: true
                        },
                        {
                            text: 'Buy Clothes',
                            leaf: true
                        },
                        {
                            text: 'Buy Clothes',
                            leaf: true
                        },
                        {
                            text: 'Buy Clothes',
                            leaf: true
                        }
                    ]
                }
            ]
        }
    }
});