param(
    [string]$StudentId = "23120117",
    [string]$DateStamp = "20261120",
    [string]$OutputDirectory = $PSScriptRoot
)

$ErrorActionPreference = "Stop"

function Get-WorkflowXml {
    return @'
<TransactionController guiclass="TransactionControllerGui" testclass="TransactionController" testname="E2E - Login to order verification" enabled="true">
  <boolProp name="TransactionController.parent">false</boolProp>
  <boolProp name="TransactionController.includeTimers">true</boolProp>
</TransactionController>
<hashTree>
  <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="01 - Login" enabled="true">
    <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
    <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
      <collectionProp name="Arguments.arguments">
        <elementProp name="" elementType="HTTPArgument">
          <boolProp name="HTTPArgument.always_encode">false</boolProp>
          <stringProp name="Argument.value">{&quot;email&quot;:&quot;${email}&quot;,&quot;password&quot;:&quot;${password}&quot;}</stringProp>
          <stringProp name="Argument.metadata">=</stringProp>
        </elementProp>
      </collectionProp>
    </elementProp>
    <stringProp name="HTTPSampler.path">/api/login</stringProp>
    <stringProp name="HTTPSampler.method">POST</stringProp>
    <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
    <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
    <stringProp name="HTTPSampler.connect_timeout">5000</stringProp>
    <stringProp name="HTTPSampler.response_timeout">10000</stringProp>
  </HTTPSamplerProxy>
  <hashTree>
    <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Login - HTTP 200" enabled="true">
      <collectionProp name="Asserion.test_strings"><stringProp name="200">200</stringProp></collectionProp>
      <stringProp name="Assertion.custom_message">Login must return HTTP 200</stringProp>
      <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
      <boolProp name="Assertion.assume_success">false</boolProp>
      <intProp name="Assertion.test_type">8</intProp>
    </ResponseAssertion>
    <hashTree/>
    <JSONPostProcessor guiclass="JSONPostProcessorGui" testclass="JSONPostProcessor" testname="Extract JWT" enabled="true">
      <stringProp name="JSONPostProcessor.referenceNames">token</stringProp>
      <stringProp name="JSONPostProcessor.jsonPathExprs">$.token</stringProp>
      <stringProp name="JSONPostProcessor.match_numbers">1</stringProp>
      <stringProp name="JSONPostProcessor.defaultValues">__MISSING__</stringProp>
    </JSONPostProcessor>
    <hashTree/>
    <JSR223Assertion guiclass="TestBeanGUI" testclass="JSR223Assertion" testname="Login - JWT exists" enabled="true">
      <stringProp name="scriptLanguage">groovy</stringProp>
      <stringProp name="parameters"></stringProp>
      <stringProp name="filename"></stringProp>
      <stringProp name="cacheKey">true</stringProp>
      <stringProp name="script">def token = vars.get('token')
if (token == null || token == '__MISSING__' || token.trim().isEmpty()) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('Login response does not contain a JWT token')
}</stringProp>
    </JSR223Assertion>
    <hashTree/>
  </hashTree>

  <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="02 - Get product list" enabled="true">
    <elementProp name="HTTPsampler.Arguments" elementType="Arguments"><collectionProp name="Arguments.arguments"/></elementProp>
    <stringProp name="HTTPSampler.path">/api/products</stringProp>
    <stringProp name="HTTPSampler.method">GET</stringProp>
    <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
    <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
    <stringProp name="HTTPSampler.connect_timeout">5000</stringProp>
    <stringProp name="HTTPSampler.response_timeout">10000</stringProp>
  </HTTPSamplerProxy>
  <hashTree>
    <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Think time 1-3s" enabled="true">
      <stringProp name="ConstantTimer.delay">1000</stringProp>
      <stringProp name="RandomTimer.range">2000</stringProp>
    </UniformRandomTimer>
    <hashTree/>
    <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Products - HTTP 200" enabled="true">
      <collectionProp name="Asserion.test_strings"><stringProp name="200">200</stringProp></collectionProp>
      <stringProp name="Assertion.custom_message">Product list must return HTTP 200</stringProp>
      <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
      <boolProp name="Assertion.assume_success">false</boolProp>
      <intProp name="Assertion.test_type">8</intProp>
    </ResponseAssertion>
    <hashTree/>
    <JSR223Assertion guiclass="TestBeanGUI" testclass="JSR223Assertion" testname="Products - Resolve selected product" enabled="true">
      <stringProp name="scriptLanguage">groovy</stringProp>
      <stringProp name="parameters"></stringProp>
      <stringProp name="filename"></stringProp>
      <stringProp name="cacheKey">true</stringProp>
      <stringProp name="script">def products
try {
    products = new groovy.json.JsonSlurper().parseText(prev.getResponseDataAsString())
} catch (Exception ex) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('Product response is not valid JSON: ' + ex.message)
    return
}
if (!(products instanceof List)) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('Product response must be a JSON array')
    return
}
def requestedId = vars.get('product_id')
def product = products.find { String.valueOf(it.id) == requestedId }
if (product == null) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('CSV product_id was not found in product list: ' + requestedId)
    return
}
vars.put('product_name', String.valueOf(product.name))
vars.put('product_price', String.valueOf(product.price))</stringProp>
    </JSR223Assertion>
    <hashTree/>
  </hashTree>

  <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="03 - Add product to cart" enabled="true">
    <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
    <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
      <collectionProp name="Arguments.arguments">
        <elementProp name="" elementType="HTTPArgument">
          <boolProp name="HTTPArgument.always_encode">false</boolProp>
          <stringProp name="Argument.value">${cart_payload}</stringProp>
          <stringProp name="Argument.metadata">=</stringProp>
        </elementProp>
      </collectionProp>
    </elementProp>
    <stringProp name="HTTPSampler.path">/api/cart</stringProp>
    <stringProp name="HTTPSampler.method">POST</stringProp>
    <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
    <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
    <stringProp name="HTTPSampler.connect_timeout">5000</stringProp>
    <stringProp name="HTTPSampler.response_timeout">10000</stringProp>
  </HTTPSamplerProxy>
  <hashTree>
    <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Think time 1-3s" enabled="true">
      <stringProp name="ConstantTimer.delay">1000</stringProp>
      <stringProp name="RandomTimer.range">2000</stringProp>
    </UniformRandomTimer>
    <hashTree/>
    <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="Authorization Header" enabled="true">
      <collectionProp name="HeaderManager.headers">
        <elementProp name="" elementType="Header">
          <stringProp name="Header.name">Authorization</stringProp>
          <stringProp name="Header.value">Bearer ${token}</stringProp>
        </elementProp>
      </collectionProp>
    </HeaderManager>
    <hashTree/>
    <JSR223PreProcessor guiclass="TestBeanGUI" testclass="JSR223PreProcessor" testname="Build cart payload" enabled="true">
      <stringProp name="scriptLanguage">groovy</stringProp>
      <stringProp name="parameters"></stringProp>
      <stringProp name="filename"></stringProp>
      <stringProp name="cacheKey">true</stringProp>
      <stringProp name="script">def payload = [
    id: Integer.valueOf(vars.get('product_id')),
    name: vars.get('product_name'),
    price: new BigDecimal(vars.get('product_price')),
    quantity: Integer.valueOf(vars.get('quantity'))
]
vars.put('cart_payload', groovy.json.JsonOutput.toJson(payload))</stringProp>
    </JSR223PreProcessor>
    <hashTree/>
    <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Cart - HTTP 200" enabled="true">
      <collectionProp name="Asserion.test_strings"><stringProp name="200">200</stringProp></collectionProp>
      <stringProp name="Assertion.custom_message">Add to cart must return HTTP 200</stringProp>
      <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
      <boolProp name="Assertion.assume_success">false</boolProp>
      <intProp name="Assertion.test_type">8</intProp>
    </ResponseAssertion>
    <hashTree/>
    <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Cart - Confirmation message" enabled="true">
      <collectionProp name="Asserion.test_strings"><stringProp name="message">Added to cart</stringProp></collectionProp>
      <stringProp name="Assertion.custom_message">Cart response must confirm the item was added</stringProp>
      <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>
      <boolProp name="Assertion.assume_success">false</boolProp>
      <intProp name="Assertion.test_type">16</intProp>
    </ResponseAssertion>
    <hashTree/>
  </hashTree>

  <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="04 - Checkout" enabled="true">
    <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
    <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
      <collectionProp name="Arguments.arguments">
        <elementProp name="" elementType="HTTPArgument">
          <boolProp name="HTTPArgument.always_encode">false</boolProp>
          <stringProp name="Argument.value">${checkout_payload}</stringProp>
          <stringProp name="Argument.metadata">=</stringProp>
        </elementProp>
      </collectionProp>
    </elementProp>
    <stringProp name="HTTPSampler.path">/api/checkout</stringProp>
    <stringProp name="HTTPSampler.method">POST</stringProp>
    <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
    <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
    <stringProp name="HTTPSampler.connect_timeout">5000</stringProp>
    <stringProp name="HTTPSampler.response_timeout">10000</stringProp>
  </HTTPSamplerProxy>
  <hashTree>
    <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Think time 1-3s" enabled="true">
      <stringProp name="ConstantTimer.delay">1000</stringProp>
      <stringProp name="RandomTimer.range">2000</stringProp>
    </UniformRandomTimer>
    <hashTree/>
    <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="Authorization Header" enabled="true">
      <collectionProp name="HeaderManager.headers">
        <elementProp name="" elementType="Header">
          <stringProp name="Header.name">Authorization</stringProp>
          <stringProp name="Header.value">Bearer ${token}</stringProp>
        </elementProp>
      </collectionProp>
    </HeaderManager>
    <hashTree/>
    <JSR223PreProcessor guiclass="TestBeanGUI" testclass="JSR223PreProcessor" testname="Build checkout payload" enabled="true">
      <stringProp name="scriptLanguage">groovy</stringProp>
      <stringProp name="parameters"></stringProp>
      <stringProp name="filename"></stringProp>
      <stringProp name="cacheKey">true</stringProp>
      <stringProp name="script">def total = new BigDecimal(vars.get('product_price')).multiply(new BigDecimal(vars.get('quantity')))
def payload = [total_amount: total, shipping_address: vars.get('shipping_address')]
vars.put('checkout_payload', groovy.json.JsonOutput.toJson(payload))</stringProp>
    </JSR223PreProcessor>
    <hashTree/>
    <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Checkout - HTTP 200" enabled="true">
      <collectionProp name="Asserion.test_strings"><stringProp name="200">200</stringProp></collectionProp>
      <stringProp name="Assertion.custom_message">Checkout must return HTTP 200</stringProp>
      <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
      <boolProp name="Assertion.assume_success">false</boolProp>
      <intProp name="Assertion.test_type">8</intProp>
    </ResponseAssertion>
    <hashTree/>
    <JSONPostProcessor guiclass="JSONPostProcessorGui" testclass="JSONPostProcessor" testname="Extract order ID" enabled="true">
      <stringProp name="JSONPostProcessor.referenceNames">order_id</stringProp>
      <stringProp name="JSONPostProcessor.jsonPathExprs">$.orderId</stringProp>
      <stringProp name="JSONPostProcessor.match_numbers">1</stringProp>
      <stringProp name="JSONPostProcessor.defaultValues">__MISSING__</stringProp>
    </JSONPostProcessor>
    <hashTree/>
    <JSR223Assertion guiclass="TestBeanGUI" testclass="JSR223Assertion" testname="Checkout - Order ID exists" enabled="true">
      <stringProp name="scriptLanguage">groovy</stringProp>
      <stringProp name="parameters"></stringProp>
      <stringProp name="filename"></stringProp>
      <stringProp name="cacheKey">true</stringProp>
      <stringProp name="script">def orderId = vars.get('order_id')
if (orderId == null || orderId == '__MISSING__' || orderId.trim().isEmpty()) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('Checkout response does not contain orderId')
}</stringProp>
    </JSR223Assertion>
    <hashTree/>
  </hashTree>

  <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="05 - Verify order in history" enabled="true">
    <elementProp name="HTTPsampler.Arguments" elementType="Arguments"><collectionProp name="Arguments.arguments"/></elementProp>
    <stringProp name="HTTPSampler.path">/api/orders/my-orders</stringProp>
    <stringProp name="HTTPSampler.method">GET</stringProp>
    <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
    <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
    <stringProp name="HTTPSampler.connect_timeout">5000</stringProp>
    <stringProp name="HTTPSampler.response_timeout">10000</stringProp>
  </HTTPSamplerProxy>
  <hashTree>
    <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Think time 1-3s" enabled="true">
      <stringProp name="ConstantTimer.delay">1000</stringProp>
      <stringProp name="RandomTimer.range">2000</stringProp>
    </UniformRandomTimer>
    <hashTree/>
    <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="Authorization Header" enabled="true">
      <collectionProp name="HeaderManager.headers">
        <elementProp name="" elementType="Header">
          <stringProp name="Header.name">Authorization</stringProp>
          <stringProp name="Header.value">Bearer ${token}</stringProp>
        </elementProp>
      </collectionProp>
    </HeaderManager>
    <hashTree/>
    <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Orders - HTTP 200" enabled="true">
      <collectionProp name="Asserion.test_strings"><stringProp name="200">200</stringProp></collectionProp>
      <stringProp name="Assertion.custom_message">Order history must return HTTP 200</stringProp>
      <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
      <boolProp name="Assertion.assume_success">false</boolProp>
      <intProp name="Assertion.test_type">8</intProp>
    </ResponseAssertion>
    <hashTree/>
    <JSR223Assertion guiclass="TestBeanGUI" testclass="JSR223Assertion" testname="Orders - Created order is pending" enabled="true">
      <stringProp name="scriptLanguage">groovy</stringProp>
      <stringProp name="parameters"></stringProp>
      <stringProp name="filename"></stringProp>
      <stringProp name="cacheKey">true</stringProp>
      <stringProp name="script">def orders
try {
    orders = new groovy.json.JsonSlurper().parseText(prev.getResponseDataAsString())
} catch (Exception ex) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('Order history is not valid JSON: ' + ex.message)
    return
}
def orderId = vars.get('order_id')
def order = orders.find { String.valueOf(it.id) == orderId }
if (order == null) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('Created order was not found in order history: ' + orderId)
} else if (String.valueOf(order.status) != 'pending') {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage('Created order status must be pending but was: ' + order.status)
}</stringProp>
    </JSR223Assertion>
    <hashTree/>
  </hashTree>
</hashTree>
'@
}

function Get-ThreadGroupXml {
    param(
        [string]$Name,
        [int]$Threads,
        [int]$RampSeconds,
        [int]$DurationSeconds,
        [int]$DelaySeconds
    )

    $workflow = Get-WorkflowXml
    return @"
<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="$Name" enabled="true">
  <stringProp name="ThreadGroup.on_sample_error">startnextloop</stringProp>
  <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
    <boolProp name="LoopController.continue_forever">true</boolProp>
    <stringProp name="LoopController.loops">-1</stringProp>
  </elementProp>
  <stringProp name="ThreadGroup.num_threads">$Threads</stringProp>
  <stringProp name="ThreadGroup.ramp_time">$RampSeconds</stringProp>
  <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
  <boolProp name="ThreadGroup.scheduler">true</boolProp>
  <stringProp name="ThreadGroup.duration">$DurationSeconds</stringProp>
  <stringProp name="ThreadGroup.delay">$DelaySeconds</stringProp>
</ThreadGroup>
<hashTree>
$workflow
</hashTree>
"@
}

function Get-ListenerXml {
    param(
        [string]$GuiClass,
        [string]$Name,
        [bool]$Enabled = $true
    )

    $enabledText = $Enabled.ToString().ToLowerInvariant()
    $template = @'
<ResultCollector guiclass="__GUI_CLASS__" testclass="ResultCollector" testname="__NAME__" enabled="__ENABLED__">
  <boolProp name="ResultCollector.error_logging">false</boolProp>
  <objProp>
    <name>saveConfig</name>
    <value class="SampleSaveConfiguration">
      <time>true</time><latency>true</latency><timestamp>true</timestamp><success>true</success>
      <label>true</label><code>true</code><message>true</message><threadName>true</threadName>
      <dataType>true</dataType><encoding>false</encoding><assertions>true</assertions><subresults>true</subresults>
      <responseData>false</responseData><samplerData>false</samplerData><xml>false</xml><fieldNames>true</fieldNames>
      <responseHeaders>false</responseHeaders><requestHeaders>false</requestHeaders><responseDataOnError>false</responseDataOnError>
      <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage><assertionsResultsToSave>0</assertionsResultsToSave>
      <bytes>true</bytes><sentBytes>true</sentBytes><url>true</url><threadCounts>true</threadCounts><idleTime>true</idleTime><connectTime>true</connectTime>
    </value>
  </objProp>
  <stringProp name="filename"></stringProp>
</ResultCollector>
<hashTree/>
'@

    return $template.Replace('__GUI_CLASS__', $GuiClass).Replace('__NAME__', $Name).Replace('__ENABLED__', $enabledText)
}

function New-TestPlanXml {
    param(
        [string]$PlanName,
        [string]$Comments,
        [string]$ThreadGroups,
        [string]$Listener
    )

    $template = @'
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="__PLAN_NAME__" enabled="true">
      <stringProp name="TestPlan.comments">__COMMENTS__</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments">
          <elementProp name="protocol" elementType="Argument"><stringProp name="Argument.name">protocol</stringProp><stringProp name="Argument.value">http</stringProp><stringProp name="Argument.metadata">=</stringProp></elementProp>
          <elementProp name="host" elementType="Argument"><stringProp name="Argument.name">host</stringProp><stringProp name="Argument.value">localhost</stringProp><stringProp name="Argument.metadata">=</stringProp></elementProp>
          <elementProp name="port" elementType="Argument"><stringProp name="Argument.name">port</stringProp><stringProp name="Argument.value">3000</stringProp><stringProp name="Argument.metadata">=</stringProp></elementProp>
        </collectionProp>
      </elementProp>
      <stringProp name="TestPlan.user_define_classpath"></stringProp>
    </TestPlan>
    <hashTree>
      <ConfigTestElement guiclass="HttpDefaultsGui" testclass="ConfigTestElement" testname="HTTP Request Defaults" enabled="true">
        <elementProp name="HTTPsampler.Arguments" elementType="Arguments"><collectionProp name="Arguments.arguments"/></elementProp>
        <stringProp name="HTTPSampler.domain">${host}</stringProp>
        <stringProp name="HTTPSampler.port">${port}</stringProp>
        <stringProp name="HTTPSampler.protocol">${protocol}</stringProp>
        <stringProp name="HTTPSampler.contentEncoding">UTF-8</stringProp>
        <stringProp name="HTTPSampler.connect_timeout">5000</stringProp>
        <stringProp name="HTTPSampler.response_timeout">10000</stringProp>
      </ConfigTestElement>
      <hashTree/>
      <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="JSON Content Type" enabled="true">
        <collectionProp name="HeaderManager.headers">
          <elementProp name="" elementType="Header"><stringProp name="Header.name">Content-Type</stringProp><stringProp name="Header.value">application/json</stringProp></elementProp>
          <elementProp name="" elementType="Header"><stringProp name="Header.name">Accept</stringProp><stringProp name="Header.value">application/json</stringProp></elementProp>
        </collectionProp>
      </HeaderManager>
      <hashTree/>
      <CookieManager guiclass="CookiePanel" testclass="CookieManager" testname="HTTP Cookie Manager" enabled="true">
        <collectionProp name="CookieManager.cookies"/>
        <boolProp name="CookieManager.clearEachIteration">true</boolProp>
        <boolProp name="CookieManager.controlledByThreadGroup">false</boolProp>
      </CookieManager>
      <hashTree/>
      <CSVDataSet guiclass="TestBeanGUI" testclass="CSVDataSet" testname="Flow input data" enabled="true">
        <stringProp name="delimiter">,</stringProp>
        <stringProp name="fileEncoding">UTF-8</stringProp>
        <stringProp name="filename">${__P(dataFile,performance-tests/task1/flow-data.csv)}</stringProp>
        <boolProp name="ignoreFirstLine">true</boolProp>
        <boolProp name="quotedData">true</boolProp>
        <boolProp name="recycle">true</boolProp>
        <stringProp name="shareMode">shareMode.all</stringProp>
        <boolProp name="stopThread">false</boolProp>
        <stringProp name="variableNames">user_index,name,email,password,product_id,quantity,shipping_address</stringProp>
      </CSVDataSet>
      <hashTree/>
__THREAD_GROUPS__
__LISTENER__
    </hashTree>
  </hashTree>
</jmeterTestPlan>
'@

    return $template.Replace('__PLAN_NAME__', $PlanName).Replace('__COMMENTS__', $Comments).Replace('__THREAD_GROUPS__', $ThreadGroups).Replace('__LISTENER__', $Listener)
}

[System.IO.Directory]::CreateDirectory($OutputDirectory) | Out-Null
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

$loadGroups = Get-ThreadGroupXml -Name "Load - 20 VU" -Threads 20 -RampSeconds 60 -DurationSeconds 360 -DelaySeconds 0
$stressGroups = @(
    Get-ThreadGroupXml -Name "Stress Stage 1 - 20 VU" -Threads 20 -RampSeconds 60 -DurationSeconds 300 -DelaySeconds 0
    Get-ThreadGroupXml -Name "Stress Stage 2 - add 20 VU" -Threads 20 -RampSeconds 10 -DurationSeconds 240 -DelaySeconds 60
    Get-ThreadGroupXml -Name "Stress Stage 3 - add 40 VU" -Threads 40 -RampSeconds 10 -DurationSeconds 180 -DelaySeconds 120
    Get-ThreadGroupXml -Name "Stress Stage 4 - add 40 VU" -Threads 40 -RampSeconds 10 -DurationSeconds 120 -DelaySeconds 180
) -join "`n"
$spikeGroups = @(
    Get-ThreadGroupXml -Name "Spike Baseline - 10 VU" -Threads 10 -RampSeconds 30 -DurationSeconds 180 -DelaySeconds 0
    Get-ThreadGroupXml -Name "Spike Burst - add 90 VU" -Threads 90 -RampSeconds 5 -DurationSeconds 60 -DelaySeconds 60
) -join "`n"

$plans = @(
    @{ Type = "Load"; Groups = $loadGroups; Listener = (Get-ListenerXml -GuiClass "SummaryReport" -Name "Summary Report"); Comments = "Normal load: ramp to 20 VU in 60s, then hold for 300s." },
    @{ Type = "Stress"; Groups = $stressGroups; Listener = (Get-ListenerXml -GuiClass "StatVisualizer" -Name "Aggregate Report"); Comments = "Step stress: approximately 20, 40, 80 and 120 concurrent VU using standard JMeter Thread Groups." },
    @{ Type = "Spike"; Groups = $spikeGroups; Listener = (Get-ListenerXml -GuiClass "ViewResultsFullVisualizer" -Name "View Results Tree" -Enabled $false); Comments = "Spike: 10 VU baseline, add 90 VU after 60s for a 60s burst, then observe 60s recovery. View Results Tree is disabled for the full run; enable only for smoke/post-run inspection." }
)

foreach ($plan in $plans) {
    $planName = "${StudentId}_$($plan.Type)_${DateStamp}"
    $xml = New-TestPlanXml -PlanName $planName -Comments $plan.Comments -ThreadGroups $plan.Groups -Listener $plan.Listener
    $path = Join-Path $OutputDirectory "${planName}.jmx"
    [System.IO.File]::WriteAllText($path, $xml, $utf8NoBom)
    Write-Output $path
}
