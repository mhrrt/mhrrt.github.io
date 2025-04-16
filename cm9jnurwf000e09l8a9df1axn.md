---
title: "Swift Language Translation using Swift Package and DeepL AI"
datePublished: Tue Apr 15 2025 11:42:54 GMT+0000 (Coordinated Universal Time)
cuid: cm9jnurwf000e09l8a9df1axn
slug: swift-language-translation-using-swift-package-and-deepl-ai-97c79fcdeced
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744791574397/d81e0521-de0f-4ae5-b4dd-9eaeea90b1f9.jpeg

---

Swift Package For Multilanguage Support

### Why Swift Package?

Creating a Swift Package in Xcode is a great way to modularize your code, promote reusability, and manage dependencies across projects, its best when you want code that can work across iOS, macOS, watchOS, tvOS, and even server-side Swift. In this artical we will stick to integrate package with iOS app only.

### Steps to Create a Reusable Translation Component

Step 1: Create a Swift Package

1: Open Xcode → File → New → Package.

2: Name it AITranslationKit.

3: Choose Library and select Swift as the language.

4: Click Create and save it in your project directory.

Step 2: Implement AI Translation Logic

Step 3: Add Localized String Support so that its localised string can be accessed with minimum effor and in clear way.

1: In this package, create a LocalizationManager.swift file, this helps handle localized .strings files in your app.

Step 4: Make the Package Available for Other Apps

1: Open Package.swift and modify the target dependencies as:

Step 5: Use the Package in Your App

1: Open your iOS app project in Xcode.

2: Go to File → Add Packages Depandencies and add the AITranslationKit package from your local repo or GitHub.

3: Use it in your app as below:

That's how you can make you wrapper usable across multiple apps.

### Swift Language Translation

### Why Swift Package?

Creating a Swift Package in Xcode is a great way to modularize your code, promote reusability, and manage dependencies across projects, its best when you want code that can work across iOS, macOS, watchOS, tvOS, and even server-side Swift. In this artical we will stick to integrate package with iOS app only.

### Steps to Create a Reusable Translation Component

Step 1: Create a Swift Package

1: Open Xcode → File → New → Package.

2: Name it AITranslationKit.

3: Choose Library and select Swift as the language.

4: Click Create and save it in your project directory.

Step 2: Implement AI Translation Logic

import Foundation  
  
public class AITranslation {  
     
    private var apiKey: String  
    private var baseURL: String   
      
    public init(deepLapiKey: String,  
                baseURL: String \= "https://api-free.deepl.com/v2/translate") {  
        self.apiKey \= deepLapiKey  
        self.baseURL \= baseURL  
    }  
  
    public func deepLTranslate(texts: \[String\],  
                               sourceLanguage: String? \= nil,  
                               targetLanguage: String,  
                               completion: @escaping (\_ results: \[String\]?, \_ error: Error?) -> Void) {  
        guard let url \= URL(string: baseURL) else {  
            // throw error  
            let error \= NSError(domain: "", code: 601, userInfo: \[NSLocalizedDescriptionKey: "Invalid baseURL"\])  
            completion(nil, error)  
            return  
        }  
          
        // Build the body with multiple \`text\` parameters  
        var params \= "auth\_key=\\(apiKey)&target\_lang=\\(targetLanguage.uppercased())"  
        if let source \= sourceLanguage { // you can specify source language  
            params += "&source\_lang=\\(source.uppercased())"  
        }  
        // get all string to make a query string  
        for text in texts {  
            if let encodedText \= text.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) {  
                params += "&text=\\(encodedText)"  
            }  
        }  
          
        var request \= URLRequest(url: url)  
        request.httpMethod \= "POST"  
        request.addValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")  
        request.httpBody \= params.data(using: .utf8)  
          
        URLSession.shared.dataTask(with: request) { data, response, error in  
            guard let data \= data, error \== nil else {  
                completion(nil, error)  
                return  
            }  
              
            do {  
                if let json \= try JSONSerialization.jsonObject(with: data) as? \[String: Any\],  
                   let translations \= json\["translations"\] as? \[\[String: Any\]\] {  
                    let results \= translations.compactMap { $0\["text"\] as? String }  
                    completion(results, nil)  
                } else {  
                    let error \= NSError(domain: "", code: 600, userInfo: \[NSLocalizedDescriptionKey: "Unable to parse response"\])  
                    completion(nil, error)  
                }  
            } catch {  
                completion(nil, error)  
            }  
        }.resume()  
    }  
  
}

Step 3: Add Localized String Support so that its localised string can be accessed with minimum effor and in clear way.

1: In this package, create a LocalizationManager.swift file, this helps handle localized .strings files in your app.

Step 5: Use the Package in Your App 1: Open your iOS app project in Xcode. 2: Go to File → Add Packages Depandencies and add the AITranslationKit package from your local repo or GitHub. 3: Use it in your app as below:

Thasts how you can make you wrapper usable across multiple apps.

*Originally published at* [*https://mhrrt.github.io*](https://mhrrt.github.io/SwiftPackageLanguageTranslation/)*.*