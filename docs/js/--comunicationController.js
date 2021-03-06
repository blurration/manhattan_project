class ComunicationController {
    constructor() {
        this.topics = {};
        this.methodProviders = {};
    }

    listenTo(topic, object) {
        if (!this.topics[topic]) {
            this.topics[topic] = [object]
            devLog('creating new topic: ' + topic)
        } else {
            this.topics[topic].push(object);
        }
    }
    
    dispatch(topic, data) {
        typeof topic !== 'string' && devError('not a valid event')
        let currentTopic = this.topics[topic];
        if (currentTopic) {
            currentTopic.forEach(function(object) {
                object['on' + topic.capitalize()] ?
                    object['on' + topic.capitalize()].call(object, data) :
                    devError('object not ready for topic: ' + topic)
            })
        } else {
            devError('no souch topic: ' + topic)
        }
    }

    registerMethod(methodName, object) {
        if (!this.methodProviders[methodName]) {
            this.methodProviders[methodName] = object;
            devLog('registering provider for method: ' + methodName); 
        } else {
            devError('already got a provider for ' + methodName + ', buddy');
        }
    }

    request(methodName) {
        let provider = this.methodProviders[methodName];
        if(provider){
            return provider[methodName].apply(provider, Array.prototype.slice.call(arguments, 1));
        } else {
            devError('can\'t get you ' + methodName)
        }
    }
}
